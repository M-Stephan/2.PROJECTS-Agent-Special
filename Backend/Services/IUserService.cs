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
        /// Get all users into the database
        /// </summary>
        /// <returns>List<UserDTO></returns>
        Task<IEnumerable<UserDTO>> GetAllUserAsync();

        /// <summary>
        ///     Get a user by his Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>UserDTO</returns>
        Task<UserDTO?> GetUserByIdAsync(string id);

        /// <summary>
        ///     Create a user and save into the database
        /// </summary>
        /// <param name="userDto"></param>
        /// <param name="password"></param>
        /// <returns>MapToDTO(ApplicationUser)</returns>
        Task<UserDTO> CreateUserAsync(UserDTO userDto, string password);

        /// <summary>
        ///     Update a user 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userDto"></param>
        /// <returns>MapToDTO(ApplicationUser)</returns>
        Task<UserDTO?> UpdateUserAsync(string id, UserDTO userDto);

        /// <summary>
        ///     Delete a user
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Boolean</returns>
        Task<bool> DeleteUserAsync(string id);

        /* AUTHENTIFICATION */

        /// <summary>
        ///     Register User
        /// </summary>
        /// <param name="userDto"></param>
        /// <param name="password"></param>
        /// <returns>Boolean</returns>
        Task<bool> RegisterAsync(UserDTO userDto, string password);

        /// <summary>
        ///     Login User
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns>result.succeeded</returns>
        Task<string?> LoginAsync(string email, string password);

        /// <summary>
        ///     Logout User
        /// </summary>
        Task LogoutAsync();
    }
}