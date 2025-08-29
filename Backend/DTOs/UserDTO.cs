using System;

namespace Backend.DTOs
{
    public class UserDTO
    {
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Address { get; set; } = string.Empty;
        public string? Phone {  get; set; } = string.Empty;
        public string? Player { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
    }
}