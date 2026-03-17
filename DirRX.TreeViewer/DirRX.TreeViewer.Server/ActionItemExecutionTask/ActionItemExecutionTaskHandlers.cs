using System;
using System.Collections.Generic;
using System.Linq;
using Sungero.Core;
using Sungero.CoreEntities;
using DirRX.TreeViewer.ActionItemExecutionTask;

namespace DirRX.TreeViewer
{
  partial class ActionItemExecutionTaskServerHandlers
  {

    public override void BeforeSave(Sungero.Domain.BeforeSaveEventArgs e)
    {
      base.BeforeSave(e);
      
      if (_obj.ParentAssignment?.Task != null && DirRX.TreeViewer.ActionItemExecutionTasks.Is(_obj.ParentAssignment?.Task))
      {
        _obj.SuperiorTask = DirRX.TreeViewer.ActionItemExecutionTasks.As(_obj.ParentAssignment.Task);
      }
      else if (_obj.ParentTask != null && DirRX.TreeViewer.ActionItemExecutionTasks.Is(_obj.ParentTask))
      {
        _obj.SuperiorTask = DirRX.TreeViewer.ActionItemExecutionTasks.As(_obj.ParentTask);
      }
    }
  }

}