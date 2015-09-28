using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataServices.Repository
{
    public class DtoLoansItems
    {
        public int id { get; set; }
        public Nullable<double> value { get; set; }
        public Nullable<System.DateTime> dueDate { get; set; }
        public Nullable<int> loanId { get; set; }
        public string byWho { get; set; }
        public string fullName { get; set; }
        public string notes { get; set; }
    
    }
}
