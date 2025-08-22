// Asset management with lazy loading and LOD support
export interface Asset3D {
  id: string
  name: string
  category: string
  price: number
  lowDetailUrl?: string
  highDetailUrl?: string
  thumbnailUrl: string
  isLoaded: boolean
  lodLevel: 'low' | 'medium' | 'high'
}

export class AssetManager {
  private assets: Map<string, Asset3D> = new Map()
  private loadedAssets: Map<string, any> = new Map()
  private loadingPromises: Map<string, Promise<any>> = new Map()

  constructor() {
    this.initializeDummyAssets()
  }

  private initializeDummyAssets() {
    // Simulate 10,000+ assets with dummy data
    const categories = ['living', 'bedroom', 'dining', 'kitchen', 'bathroom', 'office', 'outdoor']
    const baseItems = [
      'Sofa', 'Chair', 'Table', 'Bed', 'Wardrobe', 'Lamp', 'Desk', 'Shelf',
      'Cabinet', 'Mirror', 'Plant', 'Rug', 'Curtain', 'Artwork', 'Clock'
    ]
    
    let assetId = 1
    categories.forEach(category => {
      baseItems.forEach(item => {
        for (let variant = 1; variant <= 95; variant++) { // ~10,000 total items
          const asset: Asset3D = {
            id: `${category}-${item.toLowerCase()}-${variant}`,
            name: `${item} ${variant}`,
            category,
            price: Math.floor(Math.random() * 50000) + 5000,
            thumbnailUrl: `https://images.pexels.com/photos/${1000000 + assetId}/pexels-photo-${1000000 + assetId}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
            isLoaded: false,
            lodLevel: 'low'
          }
          this.assets.set(asset.id, asset)
          assetId++
        }
      })
    })
  }

  async loadAsset(assetId: string, lodLevel: 'low' | 'medium' | 'high' = 'medium'): Promise<Asset3D | null> {
    const asset = this.assets.get(assetId)
    if (!asset) return null

    const cacheKey = `${assetId}-${lodLevel}`
    
    if (this.loadedAssets.has(cacheKey)) {
      return { ...asset, isLoaded: true, lodLevel }
    }

    if (this.loadingPromises.has(cacheKey)) {
      await this.loadingPromises.get(cacheKey)
      return { ...asset, isLoaded: true, lodLevel }
    }

    // Simulate asset loading with different LOD levels
    const loadPromise = new Promise(resolve => {
      const loadTime = lodLevel === 'low' ? 100 : lodLevel === 'medium' ? 300 : 800
      setTimeout(() => {
        this.loadedAssets.set(cacheKey, { ...asset, lodLevel })
        resolve(asset)
      }, loadTime)
    })

    this.loadingPromises.set(cacheKey, loadPromise)
    await loadPromise
    this.loadingPromises.delete(cacheKey)

    return { ...asset, isLoaded: true, lodLevel }
  }

  searchAssets(query: string, category?: string, priceRange?: [number, number]): Asset3D[] {
    const results: Asset3D[] = []
    
    for (const asset of this.assets.values()) {
      let matches = true
      
      if (query && !asset.name.toLowerCase().includes(query.toLowerCase())) {
        matches = false
      }
      
      if (category && asset.category !== category) {
        matches = false
      }
      
      if (priceRange && (asset.price < priceRange[0] || asset.price > priceRange[1])) {
        matches = false
      }
      
      if (matches) {
        results.push(asset)
      }
      
      if (results.length >= 50) break // Limit results for performance
    }
    
    return results
  }

  getAssetsByCategory(category: string, limit: number = 20): Asset3D[] {
    const results: Asset3D[] = []
    
    for (const asset of this.assets.values()) {
      if (asset.category === category) {
        results.push(asset)
        if (results.length >= limit) break
      }
    }
    
    return results
  }

  getAllCategories(): string[] {
    const categories = new Set<string>()
    for (const asset of this.assets.values()) {
      categories.add(asset.category)
    }
    return Array.from(categories)
  }
}

export const assetManager = new AssetManager()