import json

from typing import Any, Generic, TypeVar
from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, ConfigDict, model_validator

T = TypeVar("T")


def convert_datetime_to_gmt(dt: datetime) -> str:
    if not dt.tzinfo:
        dt = dt.replace(tzinfo=ZoneInfo("UTC"))

    return dt.strftime("%Y-%m-%dT%H:%M:%S%z")


class CustomSchema(BaseModel):
    model_config = ConfigDict(
        json_encoders={datetime: convert_datetime_to_gmt},
        populate_by_name=True,
    )

    @model_validator(mode="before")
    @classmethod
    def set_null_microseconds(cls, data: dict[str, Any]) -> dict[str, Any]:
        if not hasattr(data, "items"):
            return data

        datetime_fields = {
            k: v.replace(microsecond=0)
            for k, v in data.items()
            if isinstance(k, datetime)
        }

        return {**data, **datetime_fields}

    def serializable_dict(self, **kwargs):
        """Return a dict which contains only serializable fields."""
        default_dict = self.model_dump()

        return jsonable_encoder(default_dict)

    def encode(self, charset) -> bytes:
        """Serialize the instance to JSON formatted string and then encode to bytes."""
        serializable = self.serializable_dict()
        json_string = json.dumps(serializable)
        return json_string.encode(charset)


#class HealthCheckResponse(CustomSchema):
 #   status: str


#class TextResponse(CustomSchema):
 #   text: str


class UrlResponse(CustomSchema):
    url: str


class FormDataRequest(CustomSchema):
    @model_validator(mode="before")
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class JsonSerializable:
    @classmethod
    def json_to_object(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class ListResponse(CustomSchema, Generic[T]):
    data: list[T]

class PaginationResponse(CustomSchema):
    total_records: int
    current_page: int
    total_pages: int
    next_page: int
    previous_page: int