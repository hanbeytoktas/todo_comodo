package com.example.todo.service;

import com.example.todo.model.Group;
import com.example.todo.model.Todo;
import com.example.todo.payload.GroupRequest;
import com.example.todo.payload.GroupResponse;
import com.example.todo.payload.PagedResponse;
import com.example.todo.payload.QueryRequest;
import com.example.todo.repository.GroupRepository;
import com.example.todo.security.UserPrincipal;
import com.example.todo.util.Helper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;


/**
 * @author hanbey
 * @apiNote Service of Group Management
 * */

@Service
public class GroupService {

    @Autowired
    private UserService userService;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private TodoService todoService;

    @Autowired
    private Helper helper;

    /**
     * @param currentUser data of active user
     * @param request query request of Group
     * @return return of PagedResponse<Group>
     * */
    public PagedResponse<GroupResponse> getAllGroupsWitPage(UserPrincipal currentUser, QueryRequest request) {
        helper.validatePageNumberAndSize(request.getPage(), request.getLimit());

        Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), Sort.Direction.valueOf(request.getSort().get(0).getDirection().toUpperCase()), request.getSort().get(0).getField());
        Page<GroupResponse> groups = groupRepository.findAllByUser(currentUser.getId(),pageable);

        if (groups.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), groups.getNumber(),
                    groups.getSize(), groups.getTotalElements(), groups.getTotalPages(), groups.isLast());
        }
        return new PagedResponse<>(groups.toList(), groups.getNumber(),
                groups.getSize(), groups.getTotalElements(), groups.getTotalPages(), groups.isLast());
    }

    /**
     * @param currentUser data of active user
     * @return return of List<Group>
     * */
    public List<GroupResponse> getAllGroup(UserPrincipal currentUser) {
        return groupRepository.findAllByUser(currentUser.getId());
    }


    /**
     * @param currentUser data of active user
     * @param request created or updated Group data
     * @return if there is not exception then return success
     * */
    @Transactional
    public Group saveGroup(UserPrincipal currentUser, GroupRequest request) {
        Group group=new Group();
        if(!ObjectUtils.isEmpty(request.getId())){
            group= groupRepository.getById(request.getId());
        }
        group.setName(request.getName());
        group.setUser(userService.getById(currentUser.getId()));
        groupRepository.save(group);
        return group;
    }

    /**
     * @param id id of Group
     * @return if there is not exception then return success
     * */
    @Transactional
    public void deleteGroup(Long id) {
        todoService.deleteAllByGruop(id);
        groupRepository.deleteById(id);
    }
}
