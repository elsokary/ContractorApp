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
    
    public partial class workerTimeSheet
    {
        public int id { get; set; }
        public Nullable<int> workerId { get; set; }
        public Nullable<System.DateTime> workDate { get; set; }
        public Nullable<double> quantity { get; set; }
        public Nullable<double> unitPrice { get; set; }
        public Nullable<double> total { get; set; }
        public Nullable<int> projectId { get; set; }
        public string notes { get; set; }
        public Nullable<bool> payed { get; set; }
        public Nullable<System.DateTime> payedDate { get; set; }
    
        public virtual projects projects { get; set; }
        public virtual workers workers { get; set; }
    }
}