    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class Roles : BaseModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Status { get; set; }
    }
}

