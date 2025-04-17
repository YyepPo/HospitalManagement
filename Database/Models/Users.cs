using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Database.Models
{
    public class Users : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        public string? PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        public String RoleId { get; set; }
        
        [Column(TypeName = "Date")]
        public DateTime? Birthday { get; set; }

        [Required]
        public String? BloodType { get; set; }

        [Required]
        public String? City { get; set; }

        public List<UserAllergy> UserAllergies { get; set; } = new List<UserAllergy>();
    }
}
