{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [];
        pkgs = import nixpkgs {
          inherit system overlays;
          config.allowUnfree = true; # For ngrok
        };

        libraries = with pkgs; [ ];

        packages = with pkgs; [
          nodejs_20
          nodejs_20.pkgs.pnpm
        ];

        devPkgs = with pkgs; [
          unzip
          ngrok # Public tunel to localhost
        ];

        # Inputs needed at compile-time
        nativeBuildInputs = with pkgs; [ 
          watchman # expo dependency
        ]; 
        # Inputs needed at runtime
        buildInputs = with pkgs; [ ] ++ packages ++ libraries;
      in
      {
        # packages.default = derivation {
        #   inherit system;
        #   name = "simple";
        #   builder = with pkgs; "${bash}/bin/bash";
        #   args = [ "-c" "echo foo > $out" ];
        #   src = ./.;
        # };

        devShells.default = pkgs.mkShell {
          # Inputs needed at runtime
          inherit buildInputs;
          # Inputs needed at compile-time
          nativeBuildInputs = nativeBuildInputs ++ devPkgs;

          shellHook = ''
          	  PATH="$PWD/node_modules/.bin:$PATH"
              export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath libraries}:$LD_LIBRARY_PATH
          '';
          PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
          PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
          PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
          PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
        };
      });
}
