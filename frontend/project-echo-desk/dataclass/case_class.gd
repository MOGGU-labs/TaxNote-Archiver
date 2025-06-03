# case_data.gd
extends Node
class_name CaseData

var id_cases: int
var case_uuid: String
var case_number: String
var id_client: int
var case_author: int
var case_name: String
var case_type: String
var case_description: String
var created_at: String
var updated_at: String
var is_deleted: bool
var deleted_at: Variant

static func safe_get(dict: Dictionary, key: String, default_value) -> Variant:
	return dict[key] if dict.has(key) and dict[key] != null else default_value

static func from_dict(dict: Dictionary) -> CaseData:
	var c := CaseData.new()
	c.id_cases = safe_get(dict, "id_cases", 0)
	c.case_uuid = safe_get(dict, "case_uuid", "")
	c.case_number = safe_get(dict, "case_number", "")
	c.id_client = safe_get(dict, "id_client", 0)
	c.case_author = safe_get(dict, "case_author", 0)
	c.case_name = safe_get(dict, "case_name", "")
	c.case_type = safe_get(dict, "case_type", "")
	c.case_description = safe_get(dict, "case_description", "")
	c.created_at = safe_get(dict, "created_at", "")
	c.updated_at = safe_get(dict, "updated_at", "")
	c.is_deleted = safe_get(dict, "is_deleted", false)
	c.deleted_at = dict.get("deleted_at", null)
	return c
