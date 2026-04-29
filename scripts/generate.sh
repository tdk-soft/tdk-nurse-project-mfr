#!/bin/bash

# Scaffolder Master Template - tdksoftconsulting
# Usage: 
#   ./scripts/generate.sh component <name>  -> Crée un composant UI dans libs/design-system
#   ./scripts/generate.sh service <name>    -> Crée un microservice de base dans apps/
#   ./scripts/generate.sh usecase <service> <name> -> Crée un use-case dans le domaine d'un service

COMMAND=$1
NAME=$2
LOWER_NAME=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')
CAP_NAME=$(echo "${NAME:0:1}" | tr '[:upper:]' '[:lower:]' && echo "${NAME:1}") # camelCase ou PascalCase selon besoin
PASCAL_NAME=$(echo "${NAME:0:1}" | tr '[:lower:]' '[:upper:]')${NAME:1}

# --- GENERATION COMPOSANT UI (Dans libs/design-system) ---
generate_ui() {
  TARGET_DIR="libs/design-system/src/$LOWER_NAME"
  mkdir -p "$TARGET_DIR"

  # Component
  cat <<EOF > "$TARGET_DIR/$PASCAL_NAME.tsx"
import React from 'react';

interface ${PASCAL_NAME}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${PASCAL_NAME} = ({ className, children }: ${PASCAL_NAME}Props) => {
  return (
    <div className={className}>
      {children || '${PASCAL_NAME} Component'}
    </div>
  );
};
EOF

  # Vitest
  cat <<EOF > "$TARGET_DIR/$PASCAL_NAME.test.tsx"
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ${PASCAL_NAME} } from './${PASCAL_NAME}';

describe('${PASCAL_NAME}', () => {
  it('should render correctly', () => {
    render(<${PASCAL_NAME}>Test</${PASCAL_NAME}>);
    expect(screen.getByText('Test')).toBeDefined();
  });
});
EOF
  echo "🚀 UI Component $PASCAL_NAME created in $TARGET_DIR"
}

# --- GENERATION USE-CASE (Clean Architecture) ---
generate_usecase() {
  SERVICE=$2
  UC_NAME=$3
  PASCAL_UC=$(echo "${UC_NAME:0:1}" | tr '[:lower:]' '[:upper:]')${UC_NAME:1}
  
  if [ -z "$SERVICE" ] || [ -z "$UC_NAME" ]; then
    echo "❌ Usage: ./scripts/generate.sh usecase <service-name> <usecase-name>"
    exit 1
  fi

  TARGET_DIR="apps/$SERVICE/src/application/use-cases"
  mkdir -p "$TARGET_DIR"

  cat <<EOF > "$TARGET_DIR/${PASCAL_UC}UseCase.ts"
export class ${PASCAL_UC}UseCase {
  constructor() {}

  async execute(input: any): Promise<any> {
    // Business logic here
    return { success: true };
  }
}
EOF
  echo "🏗️ UseCase ${PASCAL_UC} created for $SERVICE"
}

# --- ROUTER DE COMMANDES ---
case $COMMAND in
  component)
    generate_ui
    ;;
  usecase)
    generate_usecase "$@"
    ;;
  *)
    echo "❌ Usage: ./scripts/generate.sh {component|usecase}"
    echo "Example: ./scripts/generate.sh component Button"
    echo "Example: ./scripts/generate.sh usecase appointment-service CreateAppointment"
    exit 1
    ;;
esac