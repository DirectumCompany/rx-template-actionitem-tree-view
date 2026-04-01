using System;
using System.Collections.Generic;
using System.Linq;
using Sungero.Core;
using Sungero.CoreEntities;
using DirRX.TreeViewer.ActionItemExecutionTask;

namespace DirRX.TreeViewer.Server
{
  partial class ActionItemExecutionTaskFunctions
  {
    [Public]
    public Sungero.RecordManagement.IActionItemExecutionTask GetMainActionItemExecutionTaskPublic()
    {
      return this.GetMainActionItemExecutionTask();
    }
  }
}