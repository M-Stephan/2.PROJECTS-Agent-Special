using Backend.DTOs;
using Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IUserServices
    {
        /* --- C.R.U.D --- */

        /// <summary>
        ///   Create Player for User
        /// </summary>
        /// <param name="firstName">Player.FirstName</param>
        /// <param name="lastName">Player.LastName</param>
        /// <param name="age">Player.Age</param>
        /// <param name="userId">Player.Id</param>
        /// <returns>PlayerDTO</returns>
        Task<PlayerDTO?> CreatePlayerAsync(string firstName, string lastName, int age, string userId);

        /// <summary>
        ///     Get a Player by his Id
        /// </summary>
        /// <param name="id">Player.Id</param>
        /// <returns>PlayerDTO</returns>
        Task<PlayerDTO?> GetPlayerByIdAsync(string userId);

        /// <summary>
        ///     Update a Player
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userDto"></param>
        /// <returns>MapToDTO(Player)</returns>
        Task<PlayerDTO?> UpdatePlayerAsync(string userId, PlayerDTO playerDto);

        /// <summary>
        ///     Delete a Player by UserId
        /// </summary>
        /// <param name="id">Player.Id</param>
        /// <returns>Boolean</returns>
        Task<bool> DeletePlayerAsync(string userId);

        /// <summary>
        ///     Get Player by UserId
        /// </summary>
        /// <param name="userId">User.Id</param>
        /// <returns>Player.Progression</returns>
        Task<int> GetPlayerProgressionAsync(string userId);

        /// <summary>
        ///     Increment Player.Progression +1
        /// </summary>
        /// <param name="userId">User.Id</param>
        /// <returns>Boolean</returns>
        Task<bool> UpdatePlayerProgression(string userId);

        /// <summary>
        ///     Change Player.GameOver = true at the end of progression
        /// </summary>
        /// <param name="userId">User.Id</param>
        /// <returns>Boolean</returns>
        Task<bool> PlayerGameOverAsync(string userId);
    }
}