using System;
using System.Collections.Generic;
using System.Linq;
using Sungero.Core;
using Sungero.CoreEntities;
using Newtonsoft.Json;

namespace DirRX.Tree.Server
{
  partial class ModuleFunctions
  {
    /// <summary>
    /// Метод возвращает структуру для формирования дерева отображения задач на исполнение поручения.
    /// </summary>
    /// <param name="id">Ид задачи на исполнение поручения.</param>
    /// <returns>Возвращает структуру для формирования дерева.</returns>
    [Public(WebApiRequestType = RequestType.Get)]
    public string GetTreeStructureActionItemExecutionTask(long id)
    {
      var actionItemExecutionTask = DirRX.TreeViewer.ActionItemExecutionTasks.GetAll(t => t.Id == id).FirstOrDefault();
      
      if (actionItemExecutionTask == null)
        return string.Empty;
      
      var mainTask = DirRX.TreeViewer.ActionItemExecutionTasks.As(DirRX.TreeViewer.PublicFunctions.ActionItemExecutionTask.GetMainActionItemExecutionTaskPublic(actionItemExecutionTask));
      
      var rootNode = this.CreateTreeNode(mainTask);
      
      var tasks = DirRX.TreeViewer.ActionItemExecutionTasks.GetAll(t => Equals(t.MainTask, mainTask)).OrderBy(c => c.Created);
      
      var nodes = new List<DirRX.Tree.Structures.Module.ITask>();
      nodes.Add(rootNode);
      
      while (nodes.Count > 0)
      {
        var childrensNode = new List<DirRX.Tree.Structures.Module.ITask>();
        
        foreach (var node in nodes)
        {
          var childrens = tasks.Where(t => t.SuperiorTaskDirRX.Id == node.attributes.Id).Select(c => this.CreateTreeNode(c));
          
          foreach (var children in childrens)
          {
            node.children.Add(children);
            childrensNode.Add(children);
          }
        }
        
        nodes = childrensNode;
      }
      
      return JsonConvert.SerializeObject(rootNode);
    }
    
    /// <summary>
    /// Создание структуры для отображения узла дерева.
    /// </summary>
    /// <param name="task">Задача на исполнение поручения.</param>
    /// <returns>Возвращает структуру для отображения узла дерева.</returns>
    private DirRX.Tree.Structures.Module.ITask CreateTreeNode(DirRX.TreeViewer.IActionItemExecutionTask task)
    {
      var node = DirRX.Tree.Structures.Module.Task.Create();
      node.name = Sungero.Docflow.PublicFunctions.Module.CutText(task.Subject, 65);
      
      var attribute = DirRX.Tree.Structures.Module.attributes.Create();
      attribute.Id = task.Id;
      attribute.Assignee = task.Assignee?.Person.ShortName;
      attribute.Deadline = task.Deadline != null ? FormatDate(task.Deadline.Value) : null;
      attribute.Status = task.Status.ToString();
      attribute.SuperiorTaskId = task.SuperiorTaskDirRX?.Id;
      attribute.Hyperlink = Hyperlinks.Get(task);
      
      node.attributes = attribute;
      node.children = new List<DirRX.Tree.Structures.Module.ITask>();
      
      return node;
    }
    
    /// <summary>
    /// Преобразование даты к строке.
    /// </summary>
    /// <param name="dateTime">Дата.</param>
    /// <returns>Дата в виде строки.</returns>
    public string FormatDate(DateTime dateTime)
    {
      if (dateTime == null)
        return string.Empty;
      if (dateTime.TimeOfDay == TimeSpan.Zero)
        return dateTime.ToString("dd.MM.yyyy");
      else
        return dateTime.ToString("dd.MM.yyyy HH:mm"); 
    }
  }
}