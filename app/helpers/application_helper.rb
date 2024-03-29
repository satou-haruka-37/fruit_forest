module ApplicationHelper
  def default_meta_tags
    {
      site: 'くだものの森',
      title: 'くだものの森',
      reverse: true,
      charset: 'utf-8',
      description: 'くだものの森',
      keywords: 'どうぶつ,フルーツ,果物',
      canonical: request.original_url,
      separator: '|',
      og: {
        site_name: :site,
        title: :title,
        description: :description,
        type: 'website',
        url: request.original_url,
        image: image_url('ogp.png'),
        local: 'ja-JP'
      },

      twitter: {
        card: 'summary_large_image',
        site: '@lemonade_37',
        image: image_url('ogp.png')
      }
    }
  end
end
