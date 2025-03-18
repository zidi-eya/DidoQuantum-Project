from enum import Enum


class Environment(str, Enum):
    LOCAL = "LOCAL"
    STAGING = "STAGING"
    TESTING = "TESTING"
    PRODUCTION = "PRODUCTION"

    @property
    def is_debug(self) -> bool:
        return self in (self.LOCAL, self.STAGING, self.TESTING)

    @property
    def is_testing(self) -> bool:
        return self == self.TESTING

    @property
    def is_deployed(self) -> bool:
        return self in (self.STAGING, self.PRODUCTION)


class RoutePrefixes:
    GLOBAL_PREFIX = "/api"
    EMAIL = f"{GLOBAL_PREFIX}/email"
    ADMIN = f"{GLOBAL_PREFIX}/admin"
    AUTH = f"{GLOBAL_PREFIX}/auth"
    BACKGROUND_TASK = f"{GLOBAL_PREFIX}/background-task"
    STORAGE = f"{GLOBAL_PREFIX}/storage"
  


class TaskStatus(str, Enum):
    IN_PROGRESS = "in progress"
    SUCCESS = "success"
    FAILED = "failed"


class UpdateStatus(str, Enum):
    UPDATED = "updated"
    DISABLED = "disabled"
    NOT_UPDATING = "not updating"

class Gender(str, Enum):
    MALE = "Male"
    FEMALE ="Female"
    ALL = "All"