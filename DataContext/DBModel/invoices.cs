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
    
    public partial class invoices
    {
        public invoices()
        {
            this.invoicesItems = new HashSet<invoicesItems>();
        }
    
        public int id { get; set; }
        public Nullable<int> projectId { get; set; }
        public Nullable<int> invoiceNumber { get; set; }
        public Nullable<System.DateTime> invoicesDate { get; set; }
        public Nullable<double> total { get; set; }
        public Nullable<double> insurancePercent { get; set; }
        public Nullable<double> insuranceValue { get; set; }
    
        public virtual projects projects { get; set; }
        public virtual ICollection<invoicesItems> invoicesItems { get; set; }
    }
}
