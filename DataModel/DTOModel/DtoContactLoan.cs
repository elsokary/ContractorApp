using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.DTOModel
{
    public class DtoContactLoan
    {
        public int id { get; set; }

        public string contactName { get; set; }

        public string phone { get; set; }
        public string mobile { get; set; }
        public string address { get; set; }

        public string email { get; set; }
    }
}
