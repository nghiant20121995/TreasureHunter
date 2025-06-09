using FlamboyantFnb.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TreasureHunter.API.Entities;
using TreasureHunter.API.RequestModel;

namespace WebApplication1.Controllers
{
    public class TreasureController : BaseController
    {
        private readonly ILogger<TreasureController> _logger;
        private readonly IConfiguration _configuration;

        public TreasureController(IConfiguration configuration, ILogger<TreasureController> logger) : base(configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        public CreateTreasureReponse Post(CreateTreasureReq req)
        {
            ValidateIslands(req);
            ValidateTreasureNumber(req);

            var dicChest = GetChests(req.IsLands, req.TreasureNumber);

            ValidateTreasurePosition(req.TreasureNumber, dicChest);
            var distances = new List<Distance>();
            var beginningChest = new IsLand()
            {
                ChestNumber = 0,
                Id = 0,
                PositionX = 1,
                PositionY = 1
            };
            dicChest.Add(0, new List<IsLand> { beginningChest });

            RecursiveCalculateMinFuelConsumed(0, 1, 1, req.TreasureNumber, dicChest, distances, string.Empty);

            var minDistance = distances.Where(e => e.ToPosition == req.TreasureNumber)
                                       .OrderBy(e => e.TotalDistance)
                                       .FirstOrDefault();
            minDistance.Instruction = minDistance.Instruction.Trim('|');

            var newBoard = new Board()
            {
                Map = JsonSerializer.Serialize(dicChest),
                Distances = distances,
                TreasureNumber = req.TreasureNumber
            };

            var result = new CreateTreasureReponse();
            result.FuelConsumed = minDistance?.TotalDistance ?? 0.0;
            result.Instruction = minDistance?.Instruction ?? string.Empty;


            return result;
        }


        private void ValidateIslands(CreateTreasureReq req)
        {
            if (req.IsLands == null) throw new ArgumentNullException(nameof(req.IsLands));
            if (req.IsLands.Length == 0) throw new ArgumentException("Không tồn tại hòn đảo nào", nameof(req.IsLands));
        }

        private void ValidateTreasureNumber(CreateTreasureReq req)
        {
            if (req.TreasureNumber < 0) throw new ArgumentOutOfRangeException(nameof(req.TreasureNumber), "Vị trí của kho báu không hợp lệ");
        }

        private void RecursiveCalculateMinFuelConsumed(int currentChest, int fromX, int fromY, int treasureNumber, Dictionary<int, List<IsLand>> dicChest, List<Distance> distances, string instruction, double minFuelConsumed = 0.0)
        {
            var nextChest = currentChest + 1;
            if (nextChest > treasureNumber) return;
            foreach (var toIsland in dicChest[nextChest])
            {
                double fuel = CalculateFuelConsumed(fromX, fromY, toIsland.PositionX, toIsland.PositionY);
                double totalFuel = minFuelConsumed + fuel;
                var newInstruction = instruction + $"{fromX},{fromY}|";

                var newDistance = new Distance
                {
                    FromPosition = currentChest,
                    ToPosition = nextChest,
                    D = fuel,
                    FromX = fromX,
                    FromY = fromY,
                    ToX = toIsland.PositionX,
                    ToY = toIsland.PositionY,
                    Instruction = newInstruction
                };

                if (nextChest == treasureNumber)
                {
                    newDistance.TotalDistance = totalFuel;
                }

                distances.Add(newDistance);
                RecursiveCalculateMinFuelConsumed(nextChest, toIsland.PositionX, toIsland.PositionY, treasureNumber, dicChest, distances, newInstruction, totalFuel);
            }
        }


        private void ValidateTreasurePosition(int treasureNumber, Dictionary<int, List<IsLand>> dicChest)
        {
            if (!dicChest.ContainsKey(treasureNumber))
            {
                throw new KeyNotFoundException($"Không tìm thấy kho báu [{treasureNumber}] trong bản đồ.");
            }
            if (dicChest[treasureNumber].Count > 1)
            {
                throw new InvalidOperationException($"Kho báu [{treasureNumber}] chỉ ở 1 nơi duy nhất.");
            }
        }

        private Dictionary<int, List<IsLand>> GetChests(int[][] matrix, int treasureNumber)
        {
            var dic = new Dictionary<int, List<IsLand>>();
            for (var i = 0; i < matrix.Length; i++)
            {
                if (matrix[i] == null && matrix[i].Length == 0) continue;
                for (int j = 0; j < matrix[i].Length; j++)
                {
                    if (matrix[i][j] < 0 || matrix[i][j] > treasureNumber) continue;
                    var newIsLand = new IsLand
                    {
                        PositionX = i + 1,
                        PositionY = j + 1,
                        ChestNumber = matrix[i][j]
                    };
                    if (dic.ContainsKey(matrix[i][j]))
                    {
                        dic[matrix[i][j]].Add(newIsLand);
                    }
                    else
                    {
                        dic.Add(matrix[i][j], new List<IsLand>() { newIsLand });
                    }
                }
            }
            return dic;
        }


        private double CalculateFuelConsumed(int fromPositionX, int fromPositionY, int toPositionX, int toPositionY)
        {
            var deltaX = Math.Abs(fromPositionX - toPositionX);
            var deltaY = Math.Abs(fromPositionY - toPositionY);
            return Math.Sqrt(Math.Pow(deltaX, 2) + Math.Pow(deltaY, 2));
        }
    }
}
