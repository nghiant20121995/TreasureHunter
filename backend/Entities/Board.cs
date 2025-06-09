namespace TreasureHunter.API.Entities
{
    public class Board
    {
        public int Id { get; set; }
        public string Map {  get; set; }
        public int TreasureNumber {  get; set; }
        public List<Distance> Distances { get; set; }
    }
}
