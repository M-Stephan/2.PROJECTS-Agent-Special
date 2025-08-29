using System;

namespace Backend.DTOs
{
    public class PlayerDTO
    {
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public int? Age { get; set; } = null;
    }
}