package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController @Slf4j
@RequestMapping("/api/users")
@Tag(name = "UserController")
public class UserController {
    private final DefaultUserService userServ;

    public UserController(DefaultUserService userService) {
        this.userServ = userService;
    }


    @GetMapping(   "/{id}") public ResponseEntity<UserResponseFull> getById (@PathVariable UUID req){
        final UserResponseFull response =  userServ.getUserFullDTOById(req);

        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{id}/connections") public  ResponseEntity<List<UserResponseShort>>  getAll (@PathVariable UUID req){
        final List<UserResponseShort> response = userServ.getUsersShortDTOList(req);

        return response != null && !response.isEmpty()
                ? new ResponseEntity<>(response, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/{id}") public ResponseEntity<?> delete (@PathVariable(name = "id") UUID id){
        final boolean result = userServ.deleteUser(id);
        return result
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
}
