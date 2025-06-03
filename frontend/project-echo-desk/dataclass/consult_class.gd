# consult_data.gd
extends Node
class_name ConsultData

var id_consults: int
var consult_uuid: String
var consult_code: String
var id_cases: int
var tujuan_consult: String
var keterangan_consult: String
var hasil_consult: String
var konsultan_consult: String
var consult_date: String
var created_at: String
var updated_at: String
var is_deleted: bool
var deleted_at: Variant

static func safe_get(dict: Dictionary, key: String, default_value) -> Variant:
	return dict[key] if dict.has(key) and dict[key] != null else default_value

static func from_dict(dict: Dictionary) -> ConsultData:
	var c := ConsultData.new()
	c.id_consults = safe_get(dict, "id_consults", 0)
	c.consult_uuid = safe_get(dict, "consult_uuid", "")
	c.consult_code = safe_get(dict, "consult_code", "")
	c.id_cases = safe_get(dict, "id_cases", 0)
	c.tujuan_consult = safe_get(dict, "tujuan_consult", "")
	c.keterangan_consult = safe_get(dict, "keterangan_consult", "")
	c.hasil_consult = safe_get(dict, "hasil_consult", "")
	c.konsultan_consult = safe_get(dict, "konsultan_consult", "")
	c.consult_date = safe_get(dict, "consult_date", "")
	c.created_at = safe_get(dict, "created_at", "")
	c.updated_at = safe_get(dict, "updated_at", "")
	c.is_deleted = safe_get(dict, "is_deleted", false)
	c.deleted_at = dict.get("deleted_at", null)
	return c
