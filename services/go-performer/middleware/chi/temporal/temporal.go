/**
middleware/chi/temporal provides a middleware function for all REST routes that handles running the handlers through
the Temporal workflow


*/

package temporal

import (
	"context"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/google/uuid"
	"go.temporal.io/sdk/client"
	"net/http"

	"github.com/zwest-personal/demo/services/go-performer/common"
)

// AutoWorkflow will automatically wrap Chi Mux routes in a Temporal workflow
func AutoWorkflow(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// TODO

		// create new context from `r` request context, and assign key `"user"`

		// to value of `"123"`
		ctx := context.WithValue(r.Context(), "user", "123")

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// Route creates a Chi route with a Temporal workflow auto-generated to wrap it
// Works in concert with the AutoWorkflow middleware
// This is just a very basic implementation that takes in the route and function, nothing too advanced
func Route(s *common.Service, router chi.Router, path string, handler func(w http.ResponseWriter, r *http.Request)) {
	// Create a workflow based on the route details
	// TODO Pull right from config
	base := fmt.Sprintf("%s-%s-%s", "demo", "go", path)
	options := client.StartWorkflowOptions{
		ID:        fmt.Sprintf("%s-%s", base, uuid.New()),
		TaskQueue: base,
	}

	router.

}
