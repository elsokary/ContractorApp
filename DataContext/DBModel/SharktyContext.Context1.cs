﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Entities : DbContext
    {
        public Entities()
            : base("name=Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<accounters> accounters { get; set; }
        public virtual DbSet<cars> cars { get; set; }
        public virtual DbSet<cheques> cheques { get; set; }
        public virtual DbSet<companies> companies { get; set; }
        public virtual DbSet<contactsLoans> contactsLoans { get; set; }
        public virtual DbSet<expenses> expenses { get; set; }
        public virtual DbSet<expensesTypes> expensesTypes { get; set; }
        public virtual DbSet<financialCustody> financialCustody { get; set; }
        public virtual DbSet<inventory> inventory { get; set; }
        public virtual DbSet<inventoryProjectRelease> inventoryProjectRelease { get; set; }
        public virtual DbSet<invoices> invoices { get; set; }
        public virtual DbSet<invoicesItems> invoicesItems { get; set; }
        public virtual DbSet<loans> loans { get; set; }
        public virtual DbSet<loansItems> loansItems { get; set; }
        public virtual DbSet<projectItems> projectItems { get; set; }
        public virtual DbSet<projects> projects { get; set; }
        public virtual DbSet<projectsContacts> projectsContacts { get; set; }
        public virtual DbSet<projectsSubContractors> projectsSubContractors { get; set; }
        public virtual DbSet<projectsWorkers> projectsWorkers { get; set; }
        public virtual DbSet<subContractors> subContractors { get; set; }
        public virtual DbSet<subContractorsCustody> subContractorsCustody { get; set; }
        public virtual DbSet<subContractorsItems> subContractorsItems { get; set; }
        public virtual DbSet<users> users { get; set; }
        public virtual DbSet<workerLoans> workerLoans { get; set; }
        public virtual DbSet<workers> workers { get; set; }
        public virtual DbSet<workerTimeSheet> workerTimeSheet { get; set; }
        public virtual DbSet<workerTypes> workerTypes { get; set; }
    }
}
