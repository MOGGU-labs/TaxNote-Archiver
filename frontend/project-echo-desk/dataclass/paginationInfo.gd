# res://data/PaginationInfo.gd
class_name PaginationInfo

var page: int
var limit: int
var total: int
var total_pages: int

func _init(_page: int, _limit: int, _total: int, _total_pages: int) -> void:
	page = _page
	limit = _limit
	total = _total
	total_pages = _total_pages

static func from_dict(dict: Dictionary) -> PaginationInfo:
	return PaginationInfo.new(
		dict.get("page", 1),
		dict.get("limit", 10),
		dict.get("total", 0),
		dict.get("totalPages", 1)
	)
