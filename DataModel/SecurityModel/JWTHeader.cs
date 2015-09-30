using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.SecurityModel
{
    public class JwtHeader
    {
        // ReSharper disable once InconsistentNaming
        public string typ { get; set; }
        // ReSharper disable once InconsistentNaming
        public string alg { get; set; }
    }
}
