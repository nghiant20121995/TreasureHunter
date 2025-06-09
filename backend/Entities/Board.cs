using MongoDB.Bson.Serialization.Attributes;

namespace TreasureHunter.API.Entities
{
    public class Board
    {
        [BsonId]
        public string Id { get; set; }
        public string? Map {  get; set; }
        public int TreasureNumber {  get; set; }
        public List<Distance>? Distances { get; set; }
        public Distance? MinDistance { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedDate { get; set; }
    }
}
