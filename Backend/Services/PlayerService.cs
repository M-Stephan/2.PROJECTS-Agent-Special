using Backend.DTOs;
using Backend.Services;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;
using System.Threading.Tasks;


namespace Backend.Services
{

    public class PlayerService : IPlayerService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public PlayerService(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<PlayerDTO?> CreatePlayerAsync(string firstName, string lastName, int age, string userId)
        {
            var user = await _userManager.Users
                .Include(u => u.Player)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return null;

            var player = new Player()
            {
                FirstName = firstName,
                LastName = lastName,
                Age = age,
                Progression = 0,
                GameOver = false
            };

            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            user.PlayerId = player.Id;
            user.Player = player;

            await _userManager.UpdateAsync(user);

            return new PlayerDTO()
            {
                FirstName = player.FirstName,
                LastName = player.LastName,
                Age = player.Age
            };
        }

        public async Task<PlayerDTO?> GetPlayerByUserIdAsync(string userId)
        {
            var user = await _userManager.Users
                .Include(u => u.Player)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return null;

            var p = user.Player;
            if (p == null) return null;

            return new PlayerDTO
            {                
                FirstName = p.FirstName,
                LastName = p.LastName,
                Age = p.Age
            };
        }

        public async Task<PlayerDTO?> UpdatePlayerAsync(string userId, PlayerDTO playerDto)
        {
            var user = await _userManager.Users
                .Include(u => u.Player)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return null;

            var player = user.Player;

            if (player == null) return null;

            player.FirstName = playerDto.FirstName!;
            player.LastName = playerDto.LastName!;
            player.Age = playerDto.Age;

            _context.Players.Update(player);
            await _context.SaveChangesAsync();

            return new PlayerDTO
            {
                FirstName = player.FirstName,
                LastName = player.LastName,
                Age = player.Age
            };
        }

        public async Task<bool> DeletePlayerAsync(string userId)
        {
            var user = await _userManager.Users.Include(u => u.Player)
                                               .FirstOrDefaultAsync(u => u.Id == userId);
            if (user?.Player == null) return false;

            _context.Players.Remove(user.Player);
            user.PlayerId = null;
            user.Player = null;
            await _userManager.UpdateAsync(user);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> GetPlayerProgressionAsync(string userId)
        {
            var user = await _userManager.Users.Include(u => u.Player)
                                               .FirstOrDefaultAsync(u => u.Id == userId);
            return user?.Player?.Progression ?? 0;
        }

        public async Task<bool> UpdatePlayerProgression(string userId)
        {
            var user = await _userManager.Users.Include(u => u.Player)
                                               .FirstOrDefaultAsync(u => u.Id == userId);
            if (user?.Player == null) return false;

            user.Player.Progression = (user.Player.Progression ?? 0) + 1;

            _context.Players.Update(user.Player);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PlayerGameOverAsync(string userId)
        {
            var user = await _userManager.Users.Include(u => u.Player)
                                               .FirstOrDefaultAsync(u => u.Id == userId);
            if (user?.Player == null) return false;

            user.Player.GameOver = true;

            _context.Players.Update(user.Player);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}