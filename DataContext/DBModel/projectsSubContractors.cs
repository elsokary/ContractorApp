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
    
    public partial class projectsSubContractors
    {
        public int id { get; set; }
        public Nullable<int> projectId { get; set; }
        public Nullable<int> contractorId { get; set; }
    
        public virtual projects projects { get; set; }
        public virtual subContractors subContractors { get; set; }
    }
}