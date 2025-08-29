using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        // CREATE
        [HttpPost("create/{userId}")]
        public async Task<IActionResult> Create(string userId, [FromBody] PlayerDTO playerDto)
        {
            if (playerDto is null) return BadRequest("Body is required.");

            var created = await _playerService.CreatePlayerAsync(
                playerDto.FirstName!,
                playerDto.LastName!,
                playerDto.Age ?? 0,
                userId
            );

            if (created is null) return BadRequest("Impossible de créer le player.");

            // 201 + lien vers GET
            return CreatedAtAction(nameof(GetByUserId), new { userId }, created);
        }

        // READ
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUserId(string userId)
        {
            var player = await _playerService.GetPlayerByUserIdAsync(userId);
            if (player is null) return NotFound("Player non trouvé pour cet utilisateur.");
            return Ok(player);
        }

        // UPDATE
        [HttpPut("{userId}")]
        public async Task<IActionResult> Update(string userId, [FromBody] PlayerDTO playerDto)
        {
            if (playerDto is null) return BadRequest("Body is required.");

            var updated = await _playerService.UpdatePlayerAsync(userId, playerDto);
            if (updated is null) return NotFound("Player non trouvé ou update impossible.");
            return Ok(updated);
        }

        // DELETE
        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(string userId)
        {
            var ok = await _playerService.DeletePlayerAsync(userId);
            if (!ok) return NotFound("Player non trouvé.");
            return NoContent();
        }

        // GET progression
        [HttpGet("progression/{userId}")]
        public async Task<IActionResult> GetProgression(string userId)
        {
            var value = await _playerService.GetPlayerProgressionAsync(userId);
            return Ok(value);
        }

        // +1 progression
        [HttpPost("progression/increment/{userId}")]
        public async Task<IActionResult> IncrementProgression(string userId)
        {
            var ok = await _playerService.UpdatePlayerProgression(userId);
            if (!ok) return NotFound("Player non trouvé.");
            return Ok(new { message = "Progression incrémentée" });
        }

        // Game over
        [HttpPost("gameover/{userId}")]
        public async Task<IActionResult> SetGameOver(string userId)
        {
            var ok = await _playerService.PlayerGameOverAsync(userId);
            if (!ok) return NotFound("Player non trouvé.");
            return Ok(new { message = "Game over enregistré" });
        }
    }
}
