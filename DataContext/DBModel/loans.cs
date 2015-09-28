//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataContext.DBModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class loans
    {
        public loans()
        {
            this.loansItems = new HashSet<loansItems>();
        }
    
        public int id { get; set; }
        public string fullName { get; set; }
        public Nullable<System.DateTime> loanDate { get; set; }
        public Nullable<double> loanValue { get; set; }
        public Nullable<double> payed { get; set; }
        public Nullable<double> balance { get; set; }
        public Nullable<System.DateTime> dueDate { get; set; }
        public string notes { get; set; }
        public Nullable<int> contactId { get; set; }
        public Nullable<bool> status { get; set; }
    
        public virtual contactsLoans contactsLoans { get; set; }
        public virtual ICollection<loansItems> loansItems { get; set; }
    }
}
