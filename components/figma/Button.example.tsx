/**
 * EXEMPLE de composant Button généré depuis Figma
 * 
 * Ce fichier est un EXEMPLE pour montrer la structure.
 * Vous le remplacerez par le code réel généré depuis Figma avec le MCP.
 * 
 * Pour générer ce composant depuis Figma:
 * 1. Ouvrez votre composant Button dans Figma
 * 2. Copiez l'URL (ex: https://figma.com/design/ABC123/File?node-id=1-2)
 * 3. Utilisez mcp_Figma_get_design_context avec:
 *    - fileKey: "ABC123"
 *    - nodeId: "1:2"
 */

import { cn } from "@/lib/utils";

interface ButtonProps {
  /**
   * Variant du bouton (sera défini par votre design Figma)
   */
  variant?: "primary" | "secondary" | "outline";
  
  /**
   * Taille du bouton
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Contenu du bouton
   */
  children: React.ReactNode;
  
  /**
   * Classes CSS additionnelles
   */
  className?: string;
  
  /**
   * Action au clic
   */
  onClick?: () => void;
  
  /**
   * Bouton désactivé
   */
  disabled?: boolean;
}

/**
 * Composant Button
 * 
 * Ce composant sera généré automatiquement depuis Figma.
 * Les styles ci-dessous sont des exemples et seront remplacés
 * par les styles exacts de votre design system Figma.
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Styles de base
        "font-semibold rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        
        // Variants (ces valeurs viendront de Figma)
        variant === "primary" && [
          "bg-blue-600 text-white",
          "hover:bg-blue-700",
          "focus:ring-blue-500",
        ],
        variant === "secondary" && [
          "bg-purple-600 text-white",
          "hover:bg-purple-700",
          "focus:ring-purple-500",
        ],
        variant === "outline" && [
          "border-2 border-blue-600 text-blue-600",
          "hover:bg-blue-50",
          "focus:ring-blue-500",
        ],
        
        // Sizes (ces valeurs viendront de Figma)
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        
        // Classes personnalisées
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * NOTES IMPORTANTES:
 * 
 * 1. Ce fichier est un EXEMPLE uniquement
 * 2. Supprimez ce fichier une fois que vous aurez généré vos vrais composants Figma
 * 3. Les vraies valeurs (couleurs, spacing, etc.) viendront de votre design system Figma
 * 4. Le MCP Figma générera automatiquement le bon code TypeScript/React
 */

