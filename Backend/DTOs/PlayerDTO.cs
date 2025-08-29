using System;

namespace Backend.DTOs
{
    public class PlayerDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public int LastName { get; set; } = string.Empty;
        public int? Age { get; set; } = null;
        public int? Progression { get; set; } = 0; 
        public bool GameOver { get; set; } = false;
    }
}