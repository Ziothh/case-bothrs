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
        };

        libraries = with pkgs; [ ];

        packages = with pkgs; [
          nodejs_20
          nodejs_20.pkgs.pnpm
          # nodejs_20.pkgs.expo

          # prisma-engines
          # nodePackages.prisma
        ];

        devPkgs = with pkgs; [
          unzip
        ];

        # Inputs needed at compile-time
        nativeBuildInputs = with pkgs; [ 
          watchman
        ] ++ devPkgs;
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
          inherit buildInputs nativeBuildInputs;
          # buildInputs = packages;

          shellHook = ''
          	  PATH="$PWD/node_modules/.bin:$PATH"
              export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath libraries}:$LD_LIBRARY_PATH
          '';
          # PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
          # PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
          # PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
          # PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
        };
      });
}
