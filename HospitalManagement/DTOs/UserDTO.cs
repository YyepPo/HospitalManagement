using Database.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagement.DTOs
{
    public class UserDTO
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Surname { get; set; }  // Added based on Users class

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }  // Added Email, as it's required in Users class

        public string? PhoneNumber { get; set; }

        [Required]
        public string? Password { get; set; }

        [Column(TypeName = "Date")]
        public DateTime? Birthday { get; set; }  // Updated to nullable DateTime

        public String RoleId { get; set; }  // Included RoleId for foreign key reference

        public string? Status { get; set; }  // Added Status (similar to BaseModel)

        [Required]
        public string? BloodType { get; set; }  // Added BloodType, as it's required in Users class

        [Required]
        public string? City { get; set; }  // Added City, as it's required in Users class
                                           // 
        public List<int> AllergyIds { get; set; } = new List<int>(); // Add this for allergies
    }
}
