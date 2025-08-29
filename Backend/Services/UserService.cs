using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Backend.Data;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Services
{
    public class UserService
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

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .Include(u => u.Player)
                .AsNoTracking()
                .ToListAsync();

            return users.Select(user => new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                PlayerName = user.Player != null
                    ? $"{user.Player.FirstName} {user.Player.LastName}"
                    : null
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
                Email = user.Email,
                Phone = user.Phone,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                PlayerName = user.Player != null
                    ? $"{user.Player.FirstName} {user.Player.LastName}"
                    : null
            };
        }
    }
}