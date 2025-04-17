using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class UserAllergy
    {
        public int UserId { get; set; }
        public Users User { get; set; }
        public int AllergyId { get; set; }
        public Allergy Allergy { get; set; }
    }
}
