using Warehouse.Domain.Models.Base;

namespace Warehouse.Domain.Models;

/// <summary>
/// Ресурс на складе
/// </summary>
public class ResourceEntity : BaseEntityWithIdArchive
{
    /// <summary>
    /// Наименование
    /// </summary>
    public required string Name { get; set; }
}
