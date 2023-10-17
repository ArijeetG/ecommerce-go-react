package middlerware

import (
	"ecommerce/models"
	"log"

	"github.com/gofiber/fiber/v2"
)

func ACL(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.UserResponse)

	log.Println(user)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  0,
			"message": "unauthorized",
		})
	}

	role := user.Role
	adminRole := "admin"
	if role == adminRole {
		return c.Next()
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  0,
			"message": "unauthorized",
		})
	}
}
