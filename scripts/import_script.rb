#!ruby

def clean_line(text)
  text.sub!(/^[^:]+:\s+/, '')
  text.sub!(/^\s+/, '')
  text.gsub!(/[^a-z']/i, ' ')

  text
end

def parse_text
  clean = []

  IO.readlines('../assets/raw-script.txt').each do |line|
    line.chomp!

    next if line.empty?
    next if line !~ /[a-z]/

    clean << clean_line(line)
  end

  clean.join(' ')
end

def save_words(text)
  File.open('../assets/words.js', 'w') do |fh|
    words = text
            .split(/\s+/)
            .map { |p| "  `#{p}`" }
            .join(",\n")

    fh.print "const words = [\n#{words}\n];\n\nexport default words;"
  end
end

def main
  text = parse_text

  save_words text
end

main
