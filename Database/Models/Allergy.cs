using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Allergy
    {
        public int AllergyId { get; set; }
        public string AllergyName { get; set; }
        public List<UserAllergy> UserAllergies { get; set; } = new List<UserAllergy>();
    }
}
