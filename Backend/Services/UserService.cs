using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class UserService : IUserServices
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserService(ApplicationDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // ------------------ CRUD ------------------

        
        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            
            var users = await _context.Users
                .Include(u => u.Player)
                .AsNoTracking()
                .ToListAsync();

            return users.Select(u => new UserDTO
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email!,
                Phone = u.Phone,
                Address = u.Address,
                DateOfBirth = u.DateOfBirth,
                Player = u.Player != null ? $"{u.Player.FirstName} {u.Player.LastName}" : null
            });
        }

        public async Task<UserDTO?> GetUserByIdAsync(string id)
        {
            var user = await _context.Users
                .Include(u => u.Player)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return null;

            return new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email!,
                Phone = user.Phone,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Player = user.Player != null ? $"{user.Player.FirstName} {user.Player.LastName}" : null
            };
        }

        public async Task<UserDTO?> UpdateUserAsync(string id, UserDTO userDto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return null;

            // Update fields
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.PhoneNumber = userDto.Phone;
            user.Address = userDto.Address;
            user.DateOfBirth = userDto.DateOfBirth;

            if (user.Email != userDto.Email)
            {
                var setEmailResult = await _userManager.SetEmailAsync(user, userDto.Email);
                if (!setEmailResult.Succeeded) return null;
                user.UserName = userDto.Email;
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded) return null;

            await _signInManager.RefreshSignInAsync(user);

            return new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email!,
                Phone = user.PhoneNumber,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth
            };
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        // ------------------ AUTH ------------------

        public async Task<UserDTO?> RegisterAsync(RegisterDTO model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.Phone,
                Address = model.Address,
                DateOfBirth = model.DateOfBirth
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return null;

            await _signInManager.SignInAsync(user, isPersistent: false);

            
            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = user.Address,
                Phone = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Player = user.Player != null ? $"{user.Player.FirstName} {user.Player.LastName}" : null
            };
        }
        public async Task<string?> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return null;

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (!result.Succeeded) return null;

            await _signInManager.SignInAsync(user, isPersistent: false);
            return user.Id; // retourne l’ID pour savoir qui est connecté
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
