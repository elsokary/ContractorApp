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
    
    public partial class invoicesItems
    {
        public int id { get; set; }
        public Nullable<int> invoiceId { get; set; }
        public string description { get; set; }
        public string unit { get; set; }
        public Nullable<double> quantity { get; set; }
        public Nullable<double> unitPrice { get; set; }
        public Nullable<double> perviousQuantity { get; set; }
        public Nullable<double> totalQauntity { get; set; }
        public Nullable<double> total { get; set; }
        public Nullable<int> itemId { get; set; }
    
        public virtual invoices invoices { get; set; }
        public virtual projectItems projectItems { get; set; }
    }
}
