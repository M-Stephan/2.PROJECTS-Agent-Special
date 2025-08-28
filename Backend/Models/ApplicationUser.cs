using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
	public class ApplicationUser : IdentityUser
	{
		[Required]
		[MaxLength(30)]
		public string FirstName { get; set; } = string.Empty;

		[Required]
		[MaxLength(30)]
		public string LastName { get; set; } = string.Empty;

		public int? PlayerId { get; set; }
        public Player? Player { get; set; }

        [MaxLength(250)]
		public string? Address { get; set; } = string.Empty;

		public string? Phone { get; set; } = string.Empty;

		[Required]
		[DataType(DataType.Date)]
		public DateTime DateOfBirth { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	}
}