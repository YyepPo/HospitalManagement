using Database.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospitalManagement.DTOs
{
    public class RoleDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
 