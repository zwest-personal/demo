package handlers

import (
	"github.com/go-chi/chi/v5"
	"github.com/zwest-personal/demo/services/go-performer/common"
)

var Svc *common.Service

// Initialize preps our HTTP REST routes using the Chi Go Mux
func Initialize(s *common.Service) *chi.Mux {
	Svc = s
	router := chi.NewRouter()
	router.Route(Svc.Cfg.APIPath, func(rg chi.Router) {
		// Helper route for debugging/getting Payment info for an Org
		rg.Get("/connect", establishSocket)

		// Dummy route to test React connectivity
		rg.Get("/ping", getPingHandler)
	})
	return router
}
