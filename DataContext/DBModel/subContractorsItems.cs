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
    
    public partial class subContractorsItems
    {
        public int id { get; set; }
        public Nullable<int> contractorId { get; set; }
        public Nullable<int> projectId { get; set; }
        public string description { get; set; }
        public string unit { get; set; }
        public Nullable<double> quantity { get; set; }
        public Nullable<double> unitPrice { get; set; }
        public Nullable<double> total { get; set; }
        public string notes { get; set; }
        public Nullable<System.DateTime> item_date { get; set; }
    
        public virtual projects projects { get; set; }
        public virtual subContractors subContractors { get; set; }
    }
}
