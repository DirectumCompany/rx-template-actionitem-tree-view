using System;
using System.Collections.Generic;
using System.Linq;
using Sungero.Core;
using Sungero.CoreEntities;

namespace DirRX.Tree.Structures.Module
{
  /// <summary>
  /// Задача.
  /// </summary>
  [Public]
  partial class Task
  {
    /// <summary>
    /// Имя.
    /// </summary>
    public string name { get; set; }
    
    /// <summary>
    /// Атрибуты задачи.
    /// </summary>
    public DirRX.Tree.Structures.Module.Iattributes attributes { get; set; }
    
    /// <summary>
    /// Нижестоящие задачи.
    /// </summary>
    public List<DirRX.Tree.Structures.Module.ITask> children { get; set; }
  }

  /// <summary>
  /// Атрибуты.
  /// </summary>
  [Public]
  partial class attributes
  {
    /// <summary>
    /// Идентификатор.
    /// </summary>
    public long Id { get; set; }
    
    /// <summary>
    /// Идентификатор вышестоящей задачи.
    /// </summary>
    public long? SuperiorTaskId { get; set; }
    
    /// <summary>
    /// Исполнитель.
    /// </summary>
    public string Assignee { get; set; }
    
    /// <summary>
    /// Состояние.
    /// </summary>
    public string Status { get; set; }
    
    /// <summary>
    /// Срок выполнения.
    /// </summary>
    public string Deadline { get; set; }
    
    /// <summary>
    /// Ссылка на задачу.
    /// </summary>
    public string Hyperlink { get; set; }
  }
}