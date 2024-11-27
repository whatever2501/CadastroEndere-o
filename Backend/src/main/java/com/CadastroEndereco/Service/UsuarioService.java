package com.CadastroEndereco.Service;
import com.CadastroEndereco.Model.Usuario;
import com.CadastroEndereco.Repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // Salvar um novo usuário
    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Listar todos os usuários
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // Buscar usuário por ID
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
    
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        // Verifique se o usuário existe
        Usuario usuarioExistente = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Atualize os dados do usuário
        usuarioExistente.setNome(usuarioAtualizado.getNome());
        usuarioExistente.setCpf(usuarioAtualizado.getCpf());
        usuarioExistente.setCep(usuarioAtualizado.getCep());
        usuarioExistente.setLogradouro(usuarioAtualizado.getLogradouro());
        usuarioExistente.setBairro(usuarioAtualizado.getBairro());
        usuarioExistente.setCidade(usuarioAtualizado.getCidade());
        usuarioExistente.setEstado(usuarioAtualizado.getEstado());

        // Salve o usuário atualizado no banco de dados
        return usuarioRepository.save(usuarioExistente);
    }


}
