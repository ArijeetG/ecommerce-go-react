package main

import (
	"ecommerce/controllers"
	"ecommerce/initializers"
	"ecommerce/middlerware"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatalln("Failed to load environment variables! \n", err.Error())
	}
	initializers.ConnectDB(&config)
}

func main() {
	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST",
		AllowCredentials: true,
	}))

	app.Get("/api/health-check", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":  "success",
			"message": "OK",
		})
	})

	app.Route("/auth", func(router fiber.Router) {
		router.Post("/register", controllers.SignUpUser)
		router.Post("/login", controllers.SignInUser)
		router.Get("/logout", middlerware.DeserializeUser, controllers.LogOutUser)
	})

	app.Route("/shop", func(router fiber.Router) {
		router.Post("/create-item",
			middlerware.DeserializeUser,
			middlerware.ACL,
			controllers.AddItems)

		router.Get("/get-item-by-user",
			middlerware.DeserializeUser,
			controllers.GetItemsByUser)

		router.Get("/get-items",
			middlerware.DeserializeUser,
			controllers.GetItems)
	})

	app.Get("/me", middlerware.DeserializeUser, controllers.GetMe)

	log.Fatal(app.Listen(":8000"))
}
