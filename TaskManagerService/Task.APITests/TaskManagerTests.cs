using Microsoft.VisualStudio.TestTools.UnitTesting;
using Task.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task.Data;
using Task.Entity;
using System.Data.Entity;
using Moq;

namespace Task.Business.Tests
{
  [TestClass()]
  public class TaskManagerTests
  {
    private TaskManager taskManager = new TaskManager();

    [TestMethod()]
    public void FindAllTest()
    {
      //IEnumerable<TaskDTO> result = taskManager.FindAll().ToList<TaskDTO>();
      var result = taskManager.FindAll();
      int num = result.Count();

      int count = result.Count();

      Assert.IsNotNull(result);
      Assert.AreEqual(5, count);


      //Assert.Fail();
    }

    [TestMethod()]
    public void FindTest()
    {
      Assert.Fail();
    }

    [TestMethod()]
    public void SaveTaskTest()
    {
      //Assert.Fail();

      var mokset = new Mock<DbSet<Task>>();

    }

    [TestMethod()]
    public void EndTaskByIDTest()
    {
      Assert.Fail();
    }
  }
}