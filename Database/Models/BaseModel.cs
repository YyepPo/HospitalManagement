using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public abstract class BaseModel
    {
        protected BaseModel()
        {
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            Status = "active";
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public DateTime? CreatedAt { get; set; }
        
        [Required]
        public DateTime? UpdatedAt { get; set; }

        [Required]
        public string? Status { get; set; }

    }
}
